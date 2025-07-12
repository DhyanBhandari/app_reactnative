import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { MessageCircle, Mail, Link, Share2 } from 'lucide-react-native';
import { useTheme } from '@/context';
import { BRAND_COLORS } from '@/constants';
import { copyToClipboard } from '@/utils';

interface ShareButtonsProps {
  inviteCode: string;
  message: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ inviteCode, message }) => {
  const { theme } = useTheme();

  const handleShareVia = (platform: string) => {
    const inviteLink = `https://plink.app/invite/${inviteCode}`;
    const text = `${message} ${inviteLink}`;
    
    switch(platform) {
      case 'whatsapp':
        Linking.openURL(`whatsapp://send?text=${encodeURIComponent(text)}`);
        break;
      case 'email':
        Linking.openURL(`mailto:?subject=Join me on PLINK&body=${encodeURIComponent(text)}`);
        break;
      case 'copyLink':
        copyToClipboard(inviteLink, 'Invite link copied to clipboard');
        break;
      case 'more':
        // Generic share, might need a more specific implementation depending on desired functionality
        // For now, it will copy the link as a fallback
        copyToClipboard(inviteLink, 'Invite link copied to clipboard');
        Alert.alert('More Share Options', 'Additional share options would be presented here.');
        break;
      default:
        console.warn('Unknown share platform:', platform);
    }
  };

  return (
    <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Quick Share
      </Text>
      <View style={styles.shareGrid}>
        <TouchableOpacity
          onPress={() => handleShareVia('whatsapp')}
          style={[styles.shareButton, { backgroundColor: BRAND_COLORS.whatsapp }]}
        >
          <MessageCircle size={20} color="#ffffff" />
          <Text style={styles.shareButtonText}>WhatsApp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => handleShareVia('email')}
          style={[styles.shareButton, { backgroundColor: BRAND_COLORS.email }]}
        >
          <Mail size={20} color="#ffffff" />
          <Text style={styles.shareButtonText}>Email</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => handleShareVia('copyLink')}
          style={[styles.shareButton, { backgroundColor: BRAND_COLORS.copyLink }]}
        >
          <Link size={20} color="#ffffff" />
          <Text style={styles.shareButtonText}>Copy Link</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => handleShareVia('more')}
          style={[styles.shareButton, { backgroundColor: BRAND_COLORS.more }]}
        >
          <Share2 size={20} color="#ffffff" />
          <Text style={styles.shareButtonText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  shareGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: '45%',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  shareButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
