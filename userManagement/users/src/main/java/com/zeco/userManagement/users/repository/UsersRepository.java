package com.zeco.userManagement.users.repository;

import com.zeco.userManagement.users.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UsersRepository extends JpaRepository<Users, UUID> {
}
