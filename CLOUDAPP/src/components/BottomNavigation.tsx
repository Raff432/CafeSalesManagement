import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface TabItem {
  id: string;
  icon: string;
  label: string;
  onClick?: () => void;
}

interface BottomNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  const handlePress = (tab: TabItem) => {
    if (tab.onClick) {
      tab.onClick();
    } else {
      onTabChange(tab.id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => handlePress(tab)}
          >
            <Icon
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? '#ec4899' : '#6b7280'}
            />
            <Text
              style={[
                styles.label,
                activeTab === tab.id && styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  content: {
    flexDirection: 'row',
    height: 64,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#6b7280',
  },
  activeLabel: {
    color: '#ec4899',
  },
});