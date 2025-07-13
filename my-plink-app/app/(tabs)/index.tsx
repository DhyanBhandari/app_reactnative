import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
} from 'react-native';
import { carouselData, AUTO_SCROLL_INTERVAL } from '@/constants/carouselData';
import { useCarousel, useChatInput, useMenuModal } from '@/hooks/useCarousel';
import ScreenLayout from '@/components/ScreenLayout';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import AppHeader from '@/components/AppHeader';
import Carousel from '@/components/Carousel';
import ChatInput from '@/components/ChatInput';
import MenuModal from '@/components/MenuModal';

export default function HomeScreen() {
  const carousel = useCarousel(carouselData, AUTO_SCROLL_INTERVAL);
  const chatInput = useChatInput();
  const menuModal = useMenuModal();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 30}
    >
      <ScreenLayout>
        <BackgroundWrapper>
          <AppHeader onMenuPress={menuModal.handleMenuToggle} />

          <Carousel
            data={carouselData}
            currentIndex={carousel.currentIndex}
            onIndexChange={carousel.setCurrentIndex}
            fadeAnim={carousel.fadeAnim}
            scaleAnim={carousel.scaleAnim}
          />

          {/* ✅ Chat Input should appear here */}
          <View style={styles.chatWrapper}>
           <ChatInput
  chatText={chatInput.chatText}
  setChatText={chatInput.setChatText}
  isChatFocused={chatInput.isChatFocused}
  onFocus={chatInput.handleChatFocus}
  onBlur={chatInput.handleChatBlur}
  onSubmit={chatInput.handleChatSubmit}
  chatInputHeight={chatInput.chatInputHeight}
  keyboardOffset={chatInput.keyboardOffset} // ✅ Add this line
/>

          </View>
        </BackgroundWrapper>

        <MenuModal
          visible={menuModal.menuVisible}
          onClose={menuModal.handleMenuToggle}
          userModeDropdown={menuModal.userModeDropdown}
          setUserModeDropdown={menuModal.setUserModeDropdown}
          currentMode={menuModal.currentMode}
          onModeSwitch={menuModal.handleModeSwitch}
          menuAnimation={menuModal.menuAnimation}
          backdropAnimation={menuModal.backdropAnimation}
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chatWrapper: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
});
