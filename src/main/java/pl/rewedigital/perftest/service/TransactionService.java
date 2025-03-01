package pl.rewedigital.perftest.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.rewedigital.perftest.dto.TransactionRequest;
import pl.rewedigital.perftest.dto.TransactionResponse;
import pl.rewedigital.perftest.entity.TransactionEntity;
import pl.rewedigital.perftest.entity.TransactionType;
import pl.rewedigital.perftest.entity.WalletEntity;
import pl.rewedigital.perftest.exception.BadRequestException;
import pl.rewedigital.perftest.repository.TransactionRepository;

import java.time.Instant;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final WalletService walletService;

    @Transactional
    public TransactionResponse create(final TransactionRequest request) {
        final WalletEntity walletEntity = walletService.getWalletEntityById(request.walletId());

        if (!walletEntity.getCurrency().equals(request.currency())) {
            throw new BadRequestException("Transaction currency must be the same as wallet currency!");
        }

        if (TransactionType.REDEEM.equals(request.type()) && walletEntity.getBalance().compareTo(request.amount()) < 0) {
            throw new BadRequestException("Not enough funds!");
        }

        final TransactionEntity transactionEntity = new TransactionEntity();
        transactionEntity.setCurrency(request.currency());
        transactionEntity.setAmount(request.amount());
        transactionEntity.setType(request.type());

        walletEntity.addTransaction(transactionEntity);
        walletService.updateWallet(walletEntity);

        return mapToResponse(transactionEntity);
    }

    private TransactionResponse mapToResponse(final TransactionEntity savedTransaction) {
        return new TransactionResponse(
            savedTransaction.getId(),
            savedTransaction.getCurrency(),
            savedTransaction.getAmount(),
            savedTransaction.getType(),
            savedTransaction.getCreatedAt()
        );
    }
}
