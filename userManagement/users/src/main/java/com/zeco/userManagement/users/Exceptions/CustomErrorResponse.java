package com.zeco.userManagement.users.Exceptions;

import lombok.Builder;

@Builder
public record CustomErrorResponse(int status, String message) {
}
