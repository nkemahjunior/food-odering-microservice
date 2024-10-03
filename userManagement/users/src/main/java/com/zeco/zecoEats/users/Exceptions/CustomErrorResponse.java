package com.zeco.zecoEats.users.Exceptions;

import lombok.Builder;

@Builder
public record CustomErrorResponse(int status, String message) {
}
