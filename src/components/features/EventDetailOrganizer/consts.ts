export const getFollowSuccessMessage = (eventTitle: string): string =>
  `You are now following "${eventTitle}". We'll notify you about updates, schedule changes, and reminders before the event starts.`

export const getUnfollowSuccessMessage = (eventTitle: string): string =>
  `You are unfollowing "${eventTitle}". You will no longer receive updates or reminders for this event.`
