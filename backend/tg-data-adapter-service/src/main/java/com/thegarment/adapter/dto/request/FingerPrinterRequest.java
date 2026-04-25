package com.thegarment.adapter.dto.request;

public record FingerPrinterRequest(
        String fingerPrintName,
        String ip,
        Integer port
) {}