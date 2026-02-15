import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useBetting } from '../context/BettingContext';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';

export default function BetSlip({ visible, onClose }) {
  const { betSlip, balance, removeBet, clearSlip, placeBet } = useBetting();
  const [stake, setStake] = useState('');

  if (!visible || betSlip.length === 0) return null;

  const totalOdds = betSlip.reduce((acc, b) => acc * b.odds, 1);
  const stakeNum = parseFloat(stake) || 0;
  const potentialWin = +(stakeNum * totalOdds).toFixed(2);

  const selectionLabel = (sel) => {
    if (sel === 'home') return '1';
    if (sel === 'draw') return 'X';
    return '2';
  };

  const handlePlaceBet = () => {
    if (stakeNum < 5) {
      Alert.alert('Mise minimale', 'La mise minimale est de 5 MAD');
      return;
    }
    if (stakeNum > balance) {
      Alert.alert('Solde insuffisant', 'Votre solde est insuffisant pour cette mise');
      return;
    }
    placeBet(stakeNum);
    setStake('');
    Alert.alert(
      'Pari placé !',
      `Mise: ${stakeNum} MAD\nGain potentiel: ${potentialWin} MAD`,
      [{ text: 'OK', onPress: onClose }]
    );
  };

  const quickStakes = [10, 20, 50, 100, 200];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coupon de Paris</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={clearSlip}>
            <Text style={styles.clearText}>Vider</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.selections} showsVerticalScrollIndicator={false}>
        {betSlip.map((bet) => (
          <View key={bet.matchId} style={styles.betItem}>
            <View style={styles.betInfo}>
              <Text style={styles.betMatch}>
                {bet.homeTeam} vs {bet.awayTeam}
              </Text>
              <Text style={styles.betSelection}>
                Résultat: {selectionLabel(bet.selection)}
              </Text>
            </View>
            <View style={styles.betRight}>
              <Text style={styles.betOdds}>{bet.odds.toFixed(2)}</Text>
              <TouchableOpacity onPress={() => removeBet(bet.matchId)}>
                <Text style={styles.removeText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Type de pari */}
      <View style={styles.betType}>
        <Text style={styles.betTypeLabel}>
          {betSlip.length === 1 ? 'Pari Simple' : `Combiné (${betSlip.length} sélections)`}
        </Text>
        <Text style={styles.totalOdds}>Cote totale: {totalOdds.toFixed(2)}</Text>
      </View>

      {/* Mise */}
      <View style={styles.stakeSection}>
        <Text style={styles.stakeLabel}>Mise (MAD)</Text>
        <TextInput
          style={styles.stakeInput}
          value={stake}
          onChangeText={setStake}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      {/* Mises rapides */}
      <View style={styles.quickStakes}>
        {quickStakes.map((qs) => (
          <TouchableOpacity
            key={qs}
            style={styles.quickStakeButton}
            onPress={() => setStake(qs.toString())}
          >
            <Text style={styles.quickStakeText}>{qs}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Résumé */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Solde disponible</Text>
          <Text style={styles.summaryValue}>{balance.toFixed(2)} MAD</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Gain potentiel</Text>
          <Text style={[styles.summaryValue, styles.potentialWin]}>
            {potentialWin.toFixed(2)} MAD
          </Text>
        </View>
      </View>

      {/* Bouton de validation */}
      <TouchableOpacity
        style={[styles.placeBetButton, stakeNum < 5 && styles.placeBetButtonDisabled]}
        onPress={handlePlaceBet}
        disabled={stakeNum < 5}
      >
        <Text style={styles.placeBetText}>
          Placer le pari - {stakeNum > 0 ? `${stakeNum} MAD` : '---'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    maxHeight: '80%',
    borderTopWidth: 2,
    borderColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    ...FONTS.title,
    color: COLORS.text,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  clearText: {
    ...FONTS.regular,
    color: COLORS.live,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  closeText: {
    ...FONTS.bold,
    color: COLORS.textSecondary,
    fontSize: 18,
  },
  selections: {
    maxHeight: 200,
  },
  betItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  betInfo: {
    flex: 1,
  },
  betMatch: {
    ...FONTS.medium,
    color: COLORS.text,
  },
  betSelection: {
    ...FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  betRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  betOdds: {
    ...FONTS.bold,
    color: COLORS.accent,
  },
  removeText: {
    ...FONTS.regular,
    color: COLORS.live,
  },
  betType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  betTypeLabel: {
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  totalOdds: {
    ...FONTS.bold,
    color: COLORS.accent,
  },
  stakeSection: {
    marginTop: SPACING.sm,
  },
  stakeLabel: {
    ...FONTS.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  stakeInput: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    ...FONTS.title,
    color: COLORS.text,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickStakes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  quickStakeButton: {
    flex: 1,
    backgroundColor: COLORS.oddsBackground,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
  },
  quickStakeText: {
    ...FONTS.medium,
    color: COLORS.text,
  },
  summary: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  summaryLabel: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    ...FONTS.bold,
    color: COLORS.text,
  },
  potentialWin: {
    color: COLORS.won,
  },
  placeBetButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  placeBetButtonDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  placeBetText: {
    ...FONTS.bold,
    color: COLORS.white,
    fontSize: 18,
  },
});
