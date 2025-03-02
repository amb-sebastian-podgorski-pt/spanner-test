package pl.rewedigital.perftest.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.rewedigital.perftest.dto.TransactionResponse;
import pl.rewedigital.perftest.dto.WalletRequest;
import pl.rewedigital.perftest.dto.WalletResponse;
import pl.rewedigital.perftest.entity.PersonEntity;
import pl.rewedigital.perftest.entity.WalletEntity;
import pl.rewedigital.perftest.exception.ResourceNotFoundException;
import pl.rewedigital.perftest.mappers.WalletMappers;
import pl.rewedigital.perftest.repository.WalletRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WalletService {

    private final WalletRepository walletRepository;
    private final PersonService personService;

    @Transactional
    public WalletResponse createWallet(final UUID personId, final WalletRequest walletRequest) {
        final PersonEntity personEntity = personService.getPersonById(personId);

        final WalletEntity wallet = new WalletEntity();
        wallet.setName(walletRequest.name());
        wallet.setBalance(BigDecimal.ZERO);
        wallet.setCurrency(walletRequest.currency());

        final PersonEntity updatedPerson = personEntity.addWallet(wallet);

        personService.update(updatedPerson);

        return WalletMappers.mapToResponse(wallet);
    }

    @Transactional(readOnly = true)
    public WalletResponse getWalletById(final UUID walletId) {
        final WalletEntity wallet = getWalletEntityById(walletId);

        return WalletMappers.mapToResponse(wallet);
    }

    @Transactional(readOnly = true)
    public List<TransactionResponse> getWalletTransactions(final UUID walletId) {
        final WalletEntity wallet = getWalletEntityById(walletId);

        return wallet.getTransactions().stream().map(
            transaction -> new TransactionResponse(
                transaction.getId(),
                transaction.getCurrency(),
                transaction.getAmount(),
                transaction.getType(),
                transaction.getCreatedAt()
            )
        ).toList();
    }

    @Transactional(readOnly = true)
    public WalletEntity getWalletEntityById(final UUID walletId) {
        return walletRepository.findById(walletId)
            .orElseThrow(() -> new ResourceNotFoundException("Wallet not found with id: " + walletId));
    }

    @Transactional
    public WalletEntity updateWallet(final WalletEntity walletEntity) {
        return walletRepository.save(walletEntity);
    }
}
