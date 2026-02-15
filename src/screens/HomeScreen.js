import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { getLiveMatches, getUpcomingMatches } from '../data/matches';
import { useBetting } from '../context/BettingContext';
import MatchCard from '../components/MatchCard';
import BetSlip from '../components/BetSlip';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';

export default function HomeScreen({ navigation }) {
  const [slipVisible, setSlipVisible] = useState(false);
  const { betSlip, balance } = useBetting();
  const liveMatches = getLiveMatches();
  const upcomingMatches = getUpcomingMatches().slice(0, 4);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Bannière d'en-tête */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerFlag}>🇲🇦</Text>
            <View>
              <Text style={styles.bannerTitle}>BotolaBet</Text>
              <Text style={styles.bannerSubtitle}>Botola Pro Inwi</Text>
            </View>
          </View>
          <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>Solde</Text>
            <Text style={styles.balanceValue}>{balance.toFixed(2)} MAD</Text>
          </View>
        </View>

        {/* Promotions */}
        <View style={styles.promoCard}>
          <Text style={styles.promoEmoji}>⚽🎉</Text>
          <Text style={styles.promoTitle}>Bienvenue sur BotolaBet !</Text>
          <Text style={styles.promoText}>
            Bonus de bienvenue: 100% sur votre premier dépôt jusqu'à 500 MAD
          </Text>
        </View>

        {/* Matchs en direct */}
        {liveMatches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <View style={styles.liveDotLarge} />
                <Text style={styles.sectionTitle}>En Direct</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Matchs')}>
                <Text style={styles.seeAll}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </View>
        )}

        {/* Prochains matchs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Prochains Matchs</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Matchs')}>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </View>

        {/* Raccourcis */}
        <View style={styles.shortcuts}>
          <TouchableOpacity
            style={styles.shortcutCard}
            onPress={() => navigation.navigate('Classement')}
          >
            <Text style={styles.shortcutEmoji}>🏆</Text>
            <Text style={styles.shortcutText}>Classement</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shortcutCard}
            onPress={() => navigation.navigate('Profil')}
          >
            <Text style={styles.shortcutEmoji}>📊</Text>
            <Text style={styles.shortcutText}>Mes Paris</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bouton flottant coupon */}
      {betSlip.length > 0 && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setSlipVisible(true)}
        >
          <Text style={styles.fabText}>
            Coupon ({betSlip.length})
          </Text>
        </TouchableOpacity>
      )}

      {/* Modal du coupon */}
      <Modal
        visible={slipVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSlipVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={() => setSlipVisible(false)}
          />
          <BetSlip visible={slipVisible} onClose={() => setSlipVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDark,
    padding: SPACING.xl,
    paddingTop: 60,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  bannerFlag: {
    fontSize: 36,
  },
  bannerTitle: {
    ...FONTS.header,
    color: COLORS.white,
  },
  bannerSubtitle: {
    ...FONTS.small,
    color: COLORS.accent,
    fontWeight: '600',
  },
  balanceBox: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    alignItems: 'flex-end',
  },
  balanceLabel: {
    ...FONTS.tiny,
    color: COLORS.textSecondary,
  },
  balanceValue: {
    ...FONTS.bold,
    color: COLORS.accent,
  },
  promoCard: {
    backgroundColor: COLORS.secondary,
    margin: SPACING.lg,
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  promoEmoji: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  promoTitle: {
    ...FONTS.title,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  promoText: {
    ...FONTS.regular,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  liveDotLarge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.live,
  },
  sectionTitle: {
    ...FONTS.title,
    color: COLORS.text,
  },
  seeAll: {
    ...FONTS.medium,
    color: COLORS.primary,
  },
  shortcuts: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },
  shortcutCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  shortcutEmoji: {
    fontSize: 28,
    marginBottom: SPACING.sm,
  },
  shortcutText: {
    ...FONTS.medium,
    color: COLORS.text,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    left: SPACING.xl,
    right: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    ...FONTS.bold,
    color: COLORS.white,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: COLORS.overlay,
  },
});
