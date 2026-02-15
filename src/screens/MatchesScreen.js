import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { MATCHDAYS } from '../data/matches';
import { useBetting } from '../context/BettingContext';
import MatchCard from '../components/MatchCard';
import BetSlip from '../components/BetSlip';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';

export default function MatchesScreen() {
  const [selectedDay, setSelectedDay] = useState(MATCHDAYS[0].id);
  const [slipVisible, setSlipVisible] = useState(false);
  const [filter, setFilter] = useState('all'); // all, live, upcoming, finished
  const { betSlip } = useBetting();

  const currentDay = MATCHDAYS.find((d) => d.id === selectedDay);

  const filteredMatches = currentDay?.matches.filter((m) => {
    if (filter === 'all') return true;
    return m.status === filter;
  }) || [];

  const filters = [
    { key: 'all', label: 'Tous' },
    { key: 'live', label: 'En Direct' },
    { key: 'upcoming', label: 'A Venir' },
    { key: 'finished', label: 'Terminés' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🇲🇦 Botola Pro</Text>
        <Text style={styles.headerSubtitle}>Saison 2025/2026</Text>
      </View>

      {/* Sélection journée */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daySelector}
      >
        {MATCHDAYS.map((day) => (
          <TouchableOpacity
            key={day.id}
            style={[styles.dayTab, selectedDay === day.id && styles.dayTabActive]}
            onPress={() => setSelectedDay(day.id)}
          >
            <Text
              style={[styles.dayTabText, selectedDay === day.id && styles.dayTabTextActive]}
            >
              {day.label}
            </Text>
            <Text style={styles.dayDate}>{day.date}</Text>
            {day.status === 'live' && <View style={styles.dayLiveDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filtres */}
      <View style={styles.filters}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text
              style={[styles.filterText, filter === f.key && styles.filterTextActive]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Liste des matchs */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.matchList}>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={{ ...match, matchday: currentDay.label }}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>⚽</Text>
            <Text style={styles.emptyText}>Aucun match trouvé</Text>
          </View>
        )}
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
  header: {
    backgroundColor: COLORS.primaryDark,
    padding: SPACING.xl,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    ...FONTS.header,
    color: COLORS.white,
  },
  headerSubtitle: {
    ...FONTS.small,
    color: COLORS.accent,
    marginTop: SPACING.xs,
  },
  daySelector: {
    flexGrow: 0,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.backgroundLight,
  },
  dayTab: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.xs,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    minWidth: 100,
  },
  dayTabActive: {
    backgroundColor: COLORS.primary,
  },
  dayTabText: {
    ...FONTS.medium,
    color: COLORS.textSecondary,
  },
  dayTabTextActive: {
    color: COLORS.white,
  },
  dayDate: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  dayLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.live,
    marginTop: 4,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  filterText: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  matchList: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyText: {
    ...FONTS.medium,
    color: COLORS.textMuted,
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
