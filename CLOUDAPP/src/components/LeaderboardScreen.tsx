import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase } from '@react-navigation/native';

interface TabParamList extends ParamListBase {
  Leaderboard: undefined;
}

type LeaderboardScreenProps = BottomTabScreenProps<TabParamList, 'Leaderboard'>;

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = () => {
  const leaderboardData = [
    {
      rank: 1,
      name: 'Alex Johnson',
      points: 15250,
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      rank: 2,
      name: 'Sarah Smith',
      points: 14800,
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      rank: 3,
      name: 'Mike Wilson',
      points: 14200,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
  ];

  const otherRankings = Array.from({ length: 7 }, (_, i) => ({
    rank: i + 4,
    name: `User ${i + 4}`,
    points: 14000 - i * 500,
    image: `https://i.pravatar.cc/150?img=${i + 10}`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <Text style={styles.headerSubtitle}>Top Coffee Masters</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Top 3 Users */}
        <View style={styles.topThree}>
          {/* 2nd Place */}
          <View style={styles.runnerUp}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: leaderboardData[1].image }}
                style={styles.runnerUpImage}
              />
              <View style={[styles.badge, styles.silverBadge]}>
                <Icon name="award" size={16} color="#6b7280" />
              </View>
            </View>
            <Text style={styles.name}>{leaderboardData[1].name}</Text>
            <Text style={styles.points}>{leaderboardData[1].points} pts</Text>
          </View>

          {/* 1st Place */}
          <View style={styles.winner}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: leaderboardData[0].image }}
                style={styles.winnerImage}
              />
              <View style={[styles.badge, styles.goldBadge]}>
                <Icon name="award" size={20} color="#fff" />
              </View>
            </View>
            <Text style={styles.name}>{leaderboardData[0].name}</Text>
            <Text style={styles.points}>{leaderboardData[0].points} pts</Text>
          </View>

          {/* 3rd Place */}
          <View style={styles.runnerUp}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: leaderboardData[2].image }}
                style={styles.runnerUpImage}
              />
              <View style={[styles.badge, styles.bronzeBadge]}>
                <Icon name="award" size={16} color="#c2410c" />
              </View>
            </View>
            <Text style={styles.name}>{leaderboardData[2].name}</Text>
            <Text style={styles.points}>{leaderboardData[2].points} pts</Text>
          </View>
        </View>

        {/* Other Rankings */}
        <View style={styles.rankingsCard}>
          {otherRankings.map((user) => (
            <View key={user.rank} style={styles.rankingItem}>
              <Text style={styles.rankNumber}>{user.rank}</Text>
              <Image source={{ uri: user.image }} style={styles.rankImage} />
              <View style={styles.rankInfo}>
                <Text style={styles.rankName}>{user.name}</Text>
                <Text style={styles.rankPoints}>{user.points} points</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce7f3',
  },
  header: {
    backgroundColor: '#ec4899',
    paddingTop: 40,
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fce7f3',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  topThree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 32,
    marginTop: 8,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  runnerUp: {
    flex: 1,
    alignItems: 'center',
  },
  winner: {
    flex: 1,
    alignItems: 'center',
    marginTop: -16,
  },
  runnerUpImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#d1d5db',
  },
  winnerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fbbf24',
  },
  badge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldBadge: {
    backgroundColor: '#fbbf24',
  },
  silverBadge: {
    backgroundColor: '#d1d5db',
  },
  bronzeBadge: {
    backgroundColor: '#fed7aa',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  points: {
    fontSize: 14,
    color: '#ec4899',
  },
  rankingsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  rankNumber: {
    width: 32,
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  rankImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  rankInfo: {
    flex: 1,
  },
  rankName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  rankPoints: {
    fontSize: 14,
    color: '#6b7280',
  },
});