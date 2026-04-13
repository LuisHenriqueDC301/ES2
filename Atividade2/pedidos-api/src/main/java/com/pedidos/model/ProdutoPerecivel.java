package com.pedidos.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "produto_perecivel")
@PrimaryKeyJoinColumn(name = "produto_id")
public class ProdutoPerecivel extends Produto {

    private LocalDate dataValidade;

    public ProdutoPerecivel() {}

    public ProdutoPerecivel(String nome, Double preco, Integer estoque, LocalDate dataValidade) {
        super(nome, preco, estoque);
        this.dataValidade = dataValidade;
    }

    public LocalDate getDataValidade() { return dataValidade; }
    public void setDataValidade(LocalDate dataValidade) { this.dataValidade = dataValidade; }
}
