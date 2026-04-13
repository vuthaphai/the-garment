import { describe, expect, it, vi } from "vitest";
import { SettingsService } from "./settings.service";

describe("SettingsService", () => {
  it("builds the company settings endpoints from the API base path", () => {
    const http = {
      get: vi.fn(),
      put: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
    };
    const service = new SettingsService(http as never);

    service.getCompanySettings();
    service.updateCompanySettings({ companyName: "TG" });

    expect(http.get).toHaveBeenCalledWith("/api/settings/company");
    expect(http.put).toHaveBeenCalledWith("/api/settings/company", {
      companyName: "TG",
    });
  });

  it("sends the requested year as a holiday query parameter", () => {
    const http = {
      get: vi.fn(),
      put: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
    };
    const service = new SettingsService(http as never);

    service.getHolidays(2026);

    expect(http.get).toHaveBeenCalledTimes(1);
    const [url, options] = http.get.mock.calls[0];
    expect(url).toBe("/api/settings/holidays");
    expect(options.params.toString()).toBe("year=2026");
  });
});
