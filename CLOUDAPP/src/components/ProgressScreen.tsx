import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { TabScreenProps } from '../App';
import { useChallenge } from '../contexts/ChallengeContext';

type ProgressScreenProps = TabScreenProps<'Progress'>;

export const ProgressScreen: React.FC<ProgressScreenProps> = () => {
  const { state: challengeState } = useChallenge();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Progress</Text>
        <Text style={styles.headerSubtitle}>Complete challenges to earn points</Text>
      </View>

      {/* Points Summary */}
      <View style={styles.pointsSummary}>
        <View style={styles.pointsCard}>
          <Icon name="award" size={24} color="#ec4899" />
          <Text style={styles.pointsValue}>{challengeState.totalPoints}</Text>
          <Text style={styles.pointsLabel}>Total Points</Text>
        </View>
      </View>

      {/* Challenges List */}
      <ScrollView style={styles.challengesList}>
        <Text style={styles.sectionTitle}>Active Challenges</Text>
        {challengeState.challenges.map(challenge => (
          <View key={challenge.id} style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <View style={styles.challengeIcon}>
                <Icon
                  name={challenge.completed ? 'check-circle' : 'circle'}
                  size={24}
                  color={challenge.completed ? '#10b981' : '#d1d5db'}
                />
              </View>
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeDescription}>
                  {challenge.description}
                </Text>
              </View>
              <View style={styles.challengePoints}>
                <Text style={styles.pointsText}>+{challenge.points}</Text>
                <Text style={styles.pointsUnit}>pts</Text>
              </View>
            </View>
            {!challenge.completed && (
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => {
                  // Handle starting the challenge
                }}
              >
                <Text style={styles.startButtonText}>Start Challenge</Text>
                <Icon name="arrow-right" size={20} color="#ec4899" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ec4899',
    padding: 16,
    paddingTop: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fce7f3',
  },
  pointsSummary: {
    marginTop: -40,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  pointsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pointsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ec4899',
    marginVertical: 8,
  },
  pointsLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  challengesList: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  challengeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeIcon: {
    marginRight: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  challengePoints: {
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ec4899',
  },
  pointsUnit: {
    fontSize: 12,
    color: '#6b7280',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fce7f3',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ec4899',
    marginRight: 8,
  },
});