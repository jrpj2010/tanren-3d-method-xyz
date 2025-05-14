function addChatMessage(speaker, text, armyType, phaseData, isPlaceholder = false, specificEnemyAction = null) {
  const targetLog = armyType.toUpperCase() === 'QIN' ? qinChatLogElement : coalitionChatLogElement;
  const oppositeLog = armyType.toUpperCase() === 'QIN' ? coalitionChatLogElement : qinChatLogElement;

  // Phase indicator group
  const phaseIndicatorKey = `${phaseData.mainTheme || 'general'}-${phaseData.subTheme || 'general'}-${phaseData.topic || 'general'}`;
  let currentPhaseIndicator = targetLog.querySelector(`.phase-indicator-group[data-phase-key="${phaseIndicatorKey}"]`);
  if (!currentPhaseIndicator && phaseData.mainTheme && phaseData.subTheme && phaseData.topic) {
    currentPhaseIndicator = document.createElement('div');
    currentPhaseIndicator.className = 'phase-indicator-group';
    currentPhaseIndicator.setAttribute('data-phase-key', phaseIndicatorKey);
    ['mainTheme', 'subTheme', 'topic'].forEach(key => {
      if (phaseData[key]) {
        const themeDiv = document.createElement('div');
        let className = `phase-${key.toLowerCase().replace('theme', '')}`;
        if (key === 'mainTheme') className = 'phase-main-theme';
        if (key === 'subTheme') className = 'phase-sub-theme';
        if (key === 'topic') className = 'phase-topic';
        themeDiv.className = className;
        themeDiv.innerHTML = stripHtml(phaseData[key]);
        currentPhaseIndicator.appendChild(themeDiv);
      }
    });
    targetLog.appendChild(currentPhaseIndicator);
  }

  const messageWrapper = document.createElement('div');
  messageWrapper.className = 'message-wrapper';

  const messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message';
  if (isPlaceholder) {
    messageDiv.classList.add('placeholder-message');
  }

  const speakerDiv = document.createElement('div');
  speakerDiv.className = 'chat-speaker';
  const speakerIcon = document.createElement('div');
  speakerIcon.className = 'speaker-icon';
  speakerIcon.textContent = speaker.charAt(0);
  speakerDiv.appendChild(speakerIcon);
  const speakerName = document.createTextNode(` ${speaker}`);
  speakerDiv.appendChild(speakerName);
  messageDiv.appendChild(speakerDiv);

  const bubbleDiv = document.createElement('div');
  bubbleDiv.className = 'chat-bubble';
  if (isPlaceholder) {
    bubbleDiv.textContent = stripHtml(specificEnemyAction);
  } else {
    bubbleDiv.innerHTML = text; // Allows <ruby> tags to be rendered
  }
  messageDiv.appendChild(bubbleDiv);

  if (!isPlaceholder) {
    const emojiMatch = text.match(/[😀🙏🚀🔰🔥💥⚔️😱]/);
    if (emojiMatch && emojiMatch[0]) {
      const bubbleEmoji = document.createElement('div');
      bubbleEmoji.className = 'chat-bubble-emoji';
      bubbleEmoji.textContent = emojiMatch[0];
      messageDiv.appendChild(bubbleEmoji);
    }
  }

  const timestamp = document.createElement('div');
  timestamp.className = 'chat-timestamp';
  timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  messageDiv.appendChild(timestamp);

  messageWrapper.appendChild(messageDiv);
  targetLog.appendChild(messageWrapper);

  if (!isPlaceholder && (specificEnemyAction || phaseData.enemyAction)) {
    const placeholderWrapper = document.createElement('div');
    placeholderWrapper.className = 'message-wrapper placeholder-wrapper';
    const actionText = specificEnemyAction || phaseData.enemyAction;

    const pMessageDiv = document.createElement('div');
    pMessageDiv.className = 'chat-message placeholder-message';
    pMessageDiv.style.visibility = 'hidden';

    const pSpeakerDiv = document.createElement('div');
    pSpeakerDiv.className = 'chat-speaker';
    pSpeakerDiv.innerHTML = '&nbsp;';
    pMessageDiv.appendChild(pSpeakerDiv);

    const pBubbleDiv = document.createElement('div');
    pBubbleDiv.className = 'chat-bubble';
    pBubbleDiv.textContent = stripHtml(actionText) || ' ';
    pMessageDiv.appendChild(pBubbleDiv);

    placeholderWrapper.appendChild(pMessageDiv);
    oppositeLog.appendChild(placeholderWrapper);

    requestAnimationFrame(() => {
      if (messageWrapper.offsetHeight > 0) {
        placeholderWrapper.style.height = `${messageWrapper.offsetHeight}px`;
      }
      oppositeLog.scrollTop = oppositeLog.scrollHeight;
    });
  }
  targetLog.scrollTop = targetLog.scrollHeight;
}
