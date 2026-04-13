package com.pedidos.controller;

import com.pedidos.model.Produto;
import com.pedidos.model.ProdutoEletronico;
import com.pedidos.model.ProdutoPerecivel;
import com.pedidos.repository.ProdutoEletronicoRepository;
import com.pedidos.repository.ProdutoPereicivelRepository;
import com.pedidos.repository.ProdutoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoRepository produtoRepository;
    private final ProdutoEletronicoRepository eletronicoRepository;
    private final ProdutoPereicivelRepository pereicivelRepository;

    public ProdutoController(ProdutoRepository produtoRepository,
                             ProdutoEletronicoRepository eletronicoRepository,
                             ProdutoPereicivelRepository pereicivelRepository) {
        this.produtoRepository = produtoRepository;
        this.eletronicoRepository = eletronicoRepository;
        this.pereicivelRepository = pereicivelRepository;
    }

    @GetMapping
    public List<Produto> listar() {
        return produtoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> consultar(@PathVariable Long id) {
        return produtoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Produto cadastrar(@RequestBody Produto produto) {
        return produtoRepository.save(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> alterar(@PathVariable Long id, @RequestBody Produto dados) {
        return produtoRepository.findById(id).map(p -> {
            p.setNome(dados.getNome());
            p.setPreco(dados.getPreco());
            p.setEstoque(dados.getEstoque());
            return ResponseEntity.ok(produtoRepository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!produtoRepository.existsById(id)) return ResponseEntity.notFound().build();
        produtoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // --- Eletrônicos ---
    @GetMapping("/eletronicos")
    public List<ProdutoEletronico> listarEletronicos() {
        return eletronicoRepository.findAll();
    }

    @PostMapping("/eletronicos")
    public ProdutoEletronico cadastrarEletronico(@RequestBody ProdutoEletronico produto) {
        return eletronicoRepository.save(produto);
    }

    // --- Perecíveis ---
    @GetMapping("/pereciveis")
    public List<ProdutoPerecivel> listarPerecivel() {
        return pereicivelRepository.findAll();
    }

    @PostMapping("/pereciveis")
    public ProdutoPerecivel cadastrarPerecivel(@RequestBody ProdutoPerecivel produto) {
        return pereicivelRepository.save(produto);
    }
}
