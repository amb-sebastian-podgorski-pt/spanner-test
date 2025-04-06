package pl.rewedigital.perftest.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.rewedigital.perftest.dto.WalletRequest;
import pl.rewedigital.perftest.dto.WalletResponse;
import pl.rewedigital.perftest.entity.PersonEntity;
import pl.rewedigital.perftest.entity.WalletEntity;
import pl.rewedigital.perftest.mappers.WalletMapper;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WalletService {

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

        return WalletMapper.mapToResponse(wallet);
    }
}
