package com.pedidos.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigoItem;

    private Integer qtde;
    private Double valorItem;

    // Associação com Produto: muitos itens -> 1 produto
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    // Referência ao pedido dono (lado inverso da agregação)
    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false)
    @JsonBackReference
    private Pedido pedido;

    public Item() {}

    public Item(Integer qtde, Produto produto) {
        this.qtde = qtde;
        this.produto = produto;
        this.valorItem = produto.getPreco() * qtde;
    }

    // Métodos de negócio conforme UML
    public void adicionar() {}
    public void remover() {}

    public Long getCodigoItem() { return codigoItem; }
    public void setCodigoItem(Long codigoItem) { this.codigoItem = codigoItem; }
    public Integer getQtde() { return qtde; }
    public void setQtde(Integer qtde) { this.qtde = qtde; }
    public Double getValorItem() { return valorItem; }
    public void setValorItem(Double valorItem) { this.valorItem = valorItem; }
    public Produto getProduto() { return produto; }
    public void setProduto(Produto produto) { this.produto = produto; }
    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }
}
