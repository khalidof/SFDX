import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useBetting } from '../context/BettingContext';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';

export default function ProfileScreen() {
  const { balance, betHistory, addFunds } = useBetting();
  const [activeTab, setActiveTab] = useState('bets'); // bets | wallet

  const pendingBets = betHistory.filter((b) => b.status === 'pending');
  const settledBets = betHistory.filter((b) => b.status !== 'pending');

  const totalStaked = betHistory.reduce((sum, b) => sum + b.stake, 0);
  const totalWon = betHistory
    .filter((b) => b.status === 'won')
    .reduce((sum, b) => sum + b.potentialWin, 0);

  const handleDeposit = (amount) => {
    addFunds(amount);
    Alert.alert('Dépôt effectué', `${amount} MAD ont été ajoutés à votre solde`);
  };

  const selectionLabel = (sel) => {
    if (sel === 'home') return '1';
    if (sel === 'draw') return 'X';
    return '2';
  };

  const statusConfig = {
    pending: { label: 'En cours', color: COLORS.upcoming, bg: '#1a2a4a' },
    won: { label: 'Gagné', color: COLORS.won, bg: '#1a3a2a' },
    lost: { label: 'Perdu', color: COLORS.lost, bg: '#3a1a1a' },
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🇲🇦</Text>
        </View>
        <Text style={styles.username}>Parieur</Text>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Solde disponible</Text>
          <Text style={styles.balanceValue}>{balance.toFixed(2)} MAD</Text>
        </View>
      </View>

      {/* Statistiques */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{betHistory.length}</Text>
          <Text style={styles.statLabel}>Paris</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalStaked.toFixed(0)}</Text>
          <Text style={styles.statLabel}>Misé (MAD)</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: COLORS.won }]}>
            {totalWon.toFixed(0)}
          </Text>
          <Text style={styles.statLabel}>Gagné (MAD)</Text>
        </View>
      </View>

      {/* Onglets */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'bets' && styles.tabActive]}
          onPress={() => setActiveTab('bets')}
        >
          <Text style={[styles.tabText, activeTab === 'bets' && styles.tabTextActive]}>
            Mes Paris
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'wallet' && styles.tabActive]}
          onPress={() => setActiveTab('wallet')}
        >
          <Text style={[styles.tabText, activeTab === 'wallet' && styles.tabTextActive]}>
            Portefeuille
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {activeTab === 'bets' ? (
          <>
            {betHistory.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>📝</Text>
                <Text style={styles.emptyTitle}>Aucun pari</Text>
                <Text style={styles.emptyText}>
                  Placez votre premier pari sur un match de la Botola Pro !
                </Text>
              </View>
            ) : (
              <>
                {pendingBets.length > 0 && (
                  <Text style={styles.sectionTitle}>En cours</Text>
                )}
                {pendingBets.map((bet) => (
                  <BetCard key={bet.id} bet={bet} statusConfig={statusConfig} selectionLabel={selectionLabel} />
                ))}

                {settledBets.length > 0 && (
                  <Text style={styles.sectionTitle}>Historique</Text>
                )}
                {settledBets.map((bet) => (
                  <BetCard key={bet.id} bet={bet} statusConfig={statusConfig} selectionLabel={selectionLabel} />
                ))}
              </>
            )}
          </>
        ) : (
          <View style={styles.walletSection}>
            <Text style={styles.walletTitle}>Recharger votre solde</Text>
            <View style={styles.depositGrid}>
              {[50, 100, 200, 500, 1000].map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={styles.depositButton}
                  onPress={() => handleDeposit(amount)}
                >
                  <Text style={styles.depositAmount}>{amount}</Text>
                  <Text style={styles.depositCurrency}>MAD</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.walletTitle, { marginTop: SPACING.xl }]}>
              Moyens de paiement
            </Text>
            {['CIH Bank', 'Attijariwafa Bank', 'BMCE Bank', 'Cash Plus', 'Inwi Money'].map(
              (method) => (
                <TouchableOpacity key={method} style={styles.paymentMethod}>
                  <Text style={styles.paymentIcon}>🏦</Text>
                  <Text style={styles.paymentName}>{method}</Text>
                  <Text style={styles.paymentArrow}>›</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function BetCard({ bet, statusConfig, selectionLabel }) {
  const config = statusConfig[bet.status];
  return (
    <View style={[styles.betCard, { borderLeftColor: config.color }]}>
      <View style={styles.betCardHeader}>
        <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
          <Text style={[styles.statusText, { color: config.color }]}>
            {config.label}
          </Text>
        </View>
        <Text style={styles.betDate}>
          {new Date(bet.placedAt).toLocaleDateString('fr-FR')}
        </Text>
      </View>

      {bet.selections.map((sel, idx) => (
        <View key={idx} style={styles.betSelection}>
          <Text style={styles.betMatchText}>
            {sel.homeTeam} vs {sel.awayTeam}
          </Text>
          <Text style={styles.betSelectionText}>
            {selectionLabel(sel.selection)} @ {sel.odds.toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.betFooter}>
        <View>
          <Text style={styles.betFooterLabel}>Mise</Text>
          <Text style={styles.betFooterValue}>{bet.stake} MAD</Text>
        </View>
        <View>
          <Text style={styles.betFooterLabel}>Cote totale</Text>
          <Text style={styles.betFooterValue}>{bet.totalOdds.toFixed(2)}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.betFooterLabel}>Gain potentiel</Text>
          <Text style={[styles.betFooterValue, { color: COLORS.won }]}>
            {bet.potentialWin.toFixed(2)} MAD
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primaryDark,
    padding: SPACING.xl,
    paddingTop: 60,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  avatarText: {
    fontSize: 32,
  },
  username: {
    ...FONTS.title,
    color: COLORS.white,
    marginBottom: SPACING.md,
  },
  balanceCard: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  balanceLabel: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  balanceValue: {
    ...FONTS.header,
    color: COLORS.accent,
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginTop: -SPACING.md,
    borderRadius: RADIUS.lg,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...FONTS.title,
    color: COLORS.text,
  },
  statLabel: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  tabs: {
    flexDirection: 'row',
    margin: SPACING.lg,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderRadius: RADIUS.sm,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    ...FONTS.bold,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  betCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  betCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  statusText: {
    ...FONTS.tiny,
    fontWeight: '700',
  },
  betDate: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
  },
  betSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs,
  },
  betMatchText: {
    ...FONTS.regular,
    color: COLORS.text,
  },
  betSelectionText: {
    ...FONTS.regular,
    color: COLORS.accent,
  },
  betFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  betFooterLabel: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
  },
  betFooterValue: {
    ...FONTS.bold,
    color: COLORS.text,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    ...FONTS.title,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    ...FONTS.regular,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  walletSection: {
    paddingTop: SPACING.md,
  },
  walletTitle: {
    ...FONTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  depositGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  depositButton: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 90,
  },
  depositAmount: {
    ...FONTS.title,
    color: COLORS.accent,
  },
  depositCurrency: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  paymentIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
  },
  paymentName: {
    ...FONTS.medium,
    color: COLORS.text,
    flex: 1,
  },
  paymentArrow: {
    ...FONTS.header,
    color: COLORS.textMuted,
  },
});
