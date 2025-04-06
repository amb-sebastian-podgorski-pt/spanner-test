package pl.rewedigital.perftest.dto;

import java.math.BigDecimal;

public record TransactionRequest(
        BigDecimal amount,
        String currency
) {
}