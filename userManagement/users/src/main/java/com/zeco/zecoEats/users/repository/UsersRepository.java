package com.zeco.zecoEats.users.repository;


import com.zeco.zecoEats.users.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UsersRepository extends JpaRepository<Users, UUID> {
}
