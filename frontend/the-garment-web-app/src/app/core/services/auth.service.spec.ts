import { of } from "rxjs";
import { describe, expect, it, vi } from "vitest";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  it("stores token and user data after a successful login", async () => {
    const response = {
      accessToken: "token-123",
      refreshToken: "refresh-123",
      tokenType: "Bearer",
      expiresIn: 3600,
      username: "admin",
      fullName: "Admin User",
      role: "ADMIN",
      roles: ["ADMIN", "HR"],
    };

    const http = {
      post: vi.fn().mockReturnValue(of(response)),
      get: vi.fn(),
    };
    const router = {
      navigate: vi.fn(),
    };

    const service = new AuthService(http as never, router as never);
    await new Promise<void>((resolve, reject) => {
      service.login({ username: "admin", password: "secret" }).subscribe({
        next: () => resolve(),
        error: reject,
      });
    });

    expect(http.post).toHaveBeenCalledWith("/api/auth/login", {
      username: "admin",
      password: "secret",
    });
    expect(service.isAuthenticated()).toBe(true);
    expect(service.token()).toBe("token-123");
    expect(service.currentUser()).toEqual({
      username: "admin",
      fullName: "Admin User",
      role: "ADMIN",
      roles: ["ADMIN", "HR"],
    });
    expect(localStorage.getItem("tg_token")).toBe("token-123");
  });

  it("clears persisted auth state and redirects on logout", async () => {
    localStorage.setItem("tg_token", "token-123");
    localStorage.setItem("tg_user", JSON.stringify({ username: "admin" }));

    const http = {
      post: vi.fn().mockReturnValue(of(void 0)),
      get: vi.fn(),
    };
    const router = {
      navigate: vi.fn(),
    };
    const service = new AuthService(
      http as never,
      router as never,
    );

    await new Promise<void>((resolve, reject) => {
      service.logout().subscribe({
        next: () => resolve(),
        error: reject,
      });
    });

    expect(service.isAuthenticated()).toBe(false);
    expect(service.currentUser()).toBeNull();
    expect(localStorage.getItem("tg_token")).toBeNull();
    expect(localStorage.getItem("tg_user")).toBeNull();
    expect(http.post).toHaveBeenCalledWith("/api/auth/logout", {});
    expect(router.navigate).toHaveBeenCalledWith(["/login"]);
  });
});
