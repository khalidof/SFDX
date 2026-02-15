import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getTeamById } from '../data/teams';
import { useBetting } from '../context/BettingContext';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';

export default function MatchCard({ match, onPress }) {
  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);
  const { betSlip, addBet, removeBet } = useBetting();
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const isUpcoming = match.status === 'upcoming';
  const currentOdds = isLive && match.liveOdds ? match.liveOdds : match.odds;

  const existingBet = betSlip.find((b) => b.matchId === match.id);

  const handleOddsPress = (selection) => {
    if (isFinished) return;
    if (existingBet?.selection === selection) {
      removeBet(match.id);
    } else {
      addBet({
        matchId: match.id,
        selection,
        odds: currentOdds[selection],
        homeTeam: homeTeam.shortName,
        awayTeam: awayTeam.shortName,
      });
    }
  };

  const renderOddsButton = (label, key) => {
    const isSelected = existingBet?.selection === key;
    return (
      <TouchableOpacity
        style={[styles.oddsButton, isSelected && styles.oddsButtonSelected]}
        onPress={() => handleOddsPress(key)}
        disabled={isFinished}
      >
        <Text style={styles.oddsLabel}>{label}</Text>
        <Text style={[styles.oddsValue, isSelected && styles.oddsValueSelected]}>
          {currentOdds[key].toFixed(2)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* En-tête avec le statut */}
      <View style={styles.header}>
        <Text style={styles.matchday}>{match.matchday}</Text>
        {isLive && (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>{match.minute}'</Text>
          </View>
        )}
        {isFinished && <Text style={styles.finishedText}>Terminé</Text>}
        {isUpcoming && <Text style={styles.upcomingText}>{match.kickoff}</Text>}
      </View>

      {/* Équipes et score */}
      <View style={styles.matchContent}>
        <View style={styles.teamSection}>
          <Text style={styles.teamLogo}>{homeTeam.logo}</Text>
          <Text style={styles.teamName} numberOfLines={1}>{homeTeam.shortName}</Text>
        </View>

        <View style={styles.scoreSection}>
          {(isLive || isFinished) ? (
            <View style={styles.scoreBox}>
              <Text style={[styles.score, isLive && styles.scoreLive]}>
                {match.score.home} - {match.score.away}
              </Text>
            </View>
          ) : (
            <Text style={styles.vsText}>VS</Text>
          )}
        </View>

        <View style={styles.teamSection}>
          <Text style={styles.teamLogo}>{awayTeam.logo}</Text>
          <Text style={styles.teamName} numberOfLines={1}>{awayTeam.shortName}</Text>
        </View>
      </View>

      {/* Cotes 1X2 */}
      {!isFinished && (
        <View style={styles.oddsRow}>
          {renderOddsButton('1', 'home')}
          {renderOddsButton('X', 'draw')}
          {renderOddsButton('2', 'away')}
        </View>
      )}

      {/* Lieu */}
      <Text style={styles.venue} numberOfLines={1}>{match.venue}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  matchday: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.liveBackground,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.live,
    marginRight: SPACING.xs,
  },
  liveText: {
    ...FONTS.small,
    color: COLORS.live,
    fontWeight: '700',
  },
  finishedText: {
    ...FONTS.small,
    color: COLORS.finished,
  },
  upcomingText: {
    ...FONTS.small,
    color: COLORS.upcoming,
    fontWeight: '600',
  },
  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
  },
  teamLogo: {
    fontSize: 28,
    marginBottom: SPACING.xs,
  },
  teamName: {
    ...FONTS.bold,
    color: COLORS.text,
    textAlign: 'center',
  },
  scoreSection: {
    paddingHorizontal: SPACING.lg,
  },
  scoreBox: {
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  score: {
    ...FONTS.header,
    color: COLORS.text,
  },
  scoreLive: {
    color: COLORS.live,
  },
  vsText: {
    ...FONTS.bold,
    color: COLORS.textMuted,
  },
  oddsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  oddsButton: {
    flex: 1,
    backgroundColor: COLORS.oddsBackground,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  oddsButtonSelected: {
    backgroundColor: COLORS.oddsSelected,
    borderColor: COLORS.primary,
  },
  oddsLabel: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    marginBottom: 2,
  },
  oddsValue: {
    ...FONTS.bold,
    color: COLORS.accent,
  },
  oddsValueSelected: {
    color: COLORS.white,
  },
  venue: {
    ...FONTS.tiny,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
