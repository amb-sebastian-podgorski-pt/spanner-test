package pl.rewedigital.perftest.dto;

import java.util.UUID;

public record WalletRequest(
    String name,
    String currency,
    UUID personId
) {
}