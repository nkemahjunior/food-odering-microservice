package com.zeco.zecoEats.deliveries.exceptions;

import lombok.Builder;

@Builder
public record CustomErrorResponse(int status, String message) {
}
