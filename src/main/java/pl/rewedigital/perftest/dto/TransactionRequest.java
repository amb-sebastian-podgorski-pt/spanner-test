package pl.rewedigital.perftest.dto;

import pl.rewedigital.perftest.entity.TransactionType;

import java.math.BigDecimal;
import java.util.UUID;


public record TransactionRequest(
    UUID walletId,
    String currency,
    BigDecimal amount,
    TransactionType type
) {
}