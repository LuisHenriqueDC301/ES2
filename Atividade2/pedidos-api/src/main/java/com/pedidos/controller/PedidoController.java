package com.pedidos.controller;

import com.pedidos.model.Item;
import com.pedidos.model.Pedido;
import com.pedidos.repository.ItemRepository;
import com.pedidos.repository.PedidoRepository;
import com.pedidos.repository.ProdutoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoRepository pedidoRepository;
    private final ProdutoRepository produtoRepository;
    private final ItemRepository itemRepository;

    public PedidoController(PedidoRepository pedidoRepository,
                            ProdutoRepository produtoRepository,
                            ItemRepository itemRepository) {
        this.pedidoRepository = pedidoRepository;
        this.produtoRepository = produtoRepository;
        this.itemRepository = itemRepository;
    }

    @GetMapping
    public List<Pedido> listar() {
        return pedidoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> consultar(@PathVariable Long id) {
        return pedidoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pedido cadastrar(@RequestBody Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    /**
     * Adiciona um item ao pedido.
     * Body: { "produtoId": 1, "qtde": 2 }
     */
    @PostMapping("/{id}/itens")
    @Transactional
    public ResponseEntity<Pedido> adicionarItem(@PathVariable Long id,
                                                @RequestBody Map<String, Object> body) {
        Long produtoId = Long.valueOf(body.get("produtoId").toString());
        Integer qtde = Integer.valueOf(body.get("qtde").toString());

        return pedidoRepository.findById(id).map(pedido ->
                produtoRepository.findById(produtoId).map(produto -> {
                    Item item = new Item(qtde, produto);
                    item.setPedido(pedido);
                    itemRepository.save(item);
                    pedido.adicionarItem(item);
                    return ResponseEntity.ok(pedidoRepository.save(pedido));
                }).orElse(ResponseEntity.notFound().build())
        ).orElse(ResponseEntity.notFound().build());
    }
}
