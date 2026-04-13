package com.pedidos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "produto_eletronico")
@PrimaryKeyJoinColumn(name = "produto_id")
public class ProdutoEletronico extends Produto {

    private Integer voltagem;

    public ProdutoEletronico() {}

    public ProdutoEletronico(String nome, Double preco, Integer estoque, Integer voltagem) {
        super(nome, preco, estoque);
        this.voltagem = voltagem;
    }

    public Integer getVoltagem() { return voltagem; }
    public void setVoltagem(Integer voltagem) { this.voltagem = voltagem; }
}
