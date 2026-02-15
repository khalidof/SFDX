import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { STANDINGS } from '../data/standings';
import { getTeamById } from '../data/teams';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';

export default function StandingsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏆 Classement</Text>
        <Text style={styles.headerSubtitle}>Botola Pro Inwi 2025/2026</Text>
      </View>

      {/* Légende zones */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.secondary }]} />
          <Text style={styles.legendText}>Ligue des Champions CAF</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.upcoming }]} />
          <Text style={styles.legendText}>Coupe de la Confédération</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.live }]} />
          <Text style={styles.legendText}>Relégation</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* En-tête du tableau */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.rankCol]}>#</Text>
          <Text style={[styles.headerCell, styles.teamCol]}>Équipe</Text>
          <Text style={[styles.headerCell, styles.statCol]}>J</Text>
          <Text style={[styles.headerCell, styles.statCol]}>G</Text>
          <Text style={[styles.headerCell, styles.statCol]}>N</Text>
          <Text style={[styles.headerCell, styles.statCol]}>P</Text>
          <Text style={[styles.headerCell, styles.statCol]}>BP</Text>
          <Text style={[styles.headerCell, styles.statCol]}>BC</Text>
          <Text style={[styles.headerCell, styles.ptsCol]}>Pts</Text>
        </View>

        {/* Lignes du classement */}
        {STANDINGS.map((row) => {
          const team = getTeamById(row.teamId);
          const goalDiff = row.goalsFor - row.goalsAgainst;
          const isChampions = row.rank <= 2;
          const isConfed = row.rank === 3;
          const isRelegation = row.rank >= 15;

          let zoneColor = 'transparent';
          if (isChampions) zoneColor = COLORS.secondary;
          else if (isConfed) zoneColor = COLORS.upcoming;
          else if (isRelegation) zoneColor = COLORS.live;

          return (
            <View
              key={row.teamId}
              style={[
                styles.tableRow,
                row.rank % 2 === 0 && styles.tableRowEven,
              ]}
            >
              <View style={[styles.zoneBar, { backgroundColor: zoneColor }]} />
              <Text style={[styles.cell, styles.rankCol, styles.rankText]}>
                {row.rank}
              </Text>
              <View style={[styles.teamCol, styles.teamCell]}>
                <Text style={styles.teamLogo}>{team.logo}</Text>
                <Text style={styles.teamName} numberOfLines={1}>
                  {team.shortName}
                </Text>
              </View>
              <Text style={[styles.cell, styles.statCol]}>{row.played}</Text>
              <Text style={[styles.cell, styles.statCol]}>{row.won}</Text>
              <Text style={[styles.cell, styles.statCol]}>{row.drawn}</Text>
              <Text style={[styles.cell, styles.statCol]}>{row.lost}</Text>
              <Text style={[styles.cell, styles.statCol]}>{row.goalsFor}</Text>
              <Text style={[styles.cell, styles.statCol]}>{row.goalsAgainst}</Text>
              <Text style={[styles.cell, styles.ptsCol, styles.ptsText]}>
                {row.points}
              </Text>
            </View>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
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
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.md,
    backgroundColor: COLORS.backgroundLight,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    ...FONTS.tiny,
    color: COLORS.textSecondary,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  headerCell: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    fontWeight: '700',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  tableRowEven: {
    backgroundColor: COLORS.card,
  },
  zoneBar: {
    width: 3,
    height: '100%',
    position: 'absolute',
    left: 0,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  rankCol: {
    width: 28,
  },
  teamCol: {
    flex: 1,
  },
  statCol: {
    width: 28,
  },
  ptsCol: {
    width: 32,
  },
  cell: {
    ...FONTS.small,
    color: COLORS.text,
    textAlign: 'center',
  },
  rankText: {
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  teamCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  teamLogo: {
    fontSize: 14,
  },
  teamName: {
    ...FONTS.small,
    color: COLORS.text,
    fontWeight: '600',
  },
  ptsText: {
    fontWeight: '800',
    color: COLORS.accent,
  },
});
