import { Prompt } from './types';

// 5. 隨機提示池 (Random Prompt Pool)
export const PROMPT_POOL: Prompt[] = [
  { key: 'MOST_WORRIED', text: '最擔心嘅人' },
  { key: 'MOST_COMFORTABLE', text: '相處最舒服嘅人' },
  { key: 'FAVORITE_PERSON', text: '最喜歡嘅人' },
  { key: 'MOST_BLESSED', text: '最想祝福嘅人' },
  { key: 'MOST_TRUSTED', text: '最信任嘅人' },
  { key: 'MOST_GRATEFUL', text: '最想多謝嘅人' },
  { key: 'NEEDS_HUG', text: '最需要被安慰嘅人' },
  { key: 'SECRET_ADMIRER', text: '一直默默留意嘅人' },
  { key: 'MADE_YOU_LAUGH', text: '最近令你大笑嘅人' },
  { key: 'LONG_TIME_NO_SEE', text: '好耐無見嘅舊朋友' },
];

export const INITIAL_HISTORY_SEED = [
  {
    id: 'seed-1',
    timestamp: Date.now() - 10000000,
    fromName: '大象女士',
    toName: '阿明',
    promptKey: 'START',
    promptText: '開始旅程',
    nextPromptKey: 'MOST_WORRIED',
    nextPromptText: '最擔心嘅人'
  }
];