package com.pedidos.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;
    private Double valorTotal;

    // Agregação: Pedido (todo) -> Itens (partes), 1..1 para 1..*
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Item> itens = new ArrayList<>();

    public Pedido() {
        this.data = LocalDate.now();
        this.valorTotal = 0.0;
    }

    // Métodos de negócio conforme UML
    public Pedido consultar() { return this; }
    public void cadastrar() {}

    public void adicionarItem(Item item) {
        item.setPedido(this);
        itens.add(item);
        recalcularTotal();
    }

    public void removerItem(Item item) {
        itens.remove(item);
        recalcularTotal();
    }

    private void recalcularTotal() {
        this.valorTotal = itens.stream()
                .mapToDouble(Item::getValorItem)
                .sum();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public Double getValorTotal() { return valorTotal; }
    public void setValorTotal(Double valorTotal) { this.valorTotal = valorTotal; }
    public List<Item> getItens() { return itens; }
    public void setItens(List<Item> itens) { this.itens = itens; }
}
