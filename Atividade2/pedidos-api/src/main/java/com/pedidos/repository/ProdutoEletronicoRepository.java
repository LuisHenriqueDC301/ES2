package com.pedidos.repository;

import com.pedidos.model.ProdutoEletronico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoEletronicoRepository extends JpaRepository<ProdutoEletronico, Long> {}
