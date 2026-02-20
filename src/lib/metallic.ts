export type MetallicVariant =
  | 'silver' | 'platinum' | 'blue' | 'gold'
  | 'red' | 'green' | 'brandBg' | 'brandText';

export const metallic: Record<MetallicVariant, string> = {
  silver:    'linear-gradient(135deg, #a0a0a0 0%, #ffffff 50%, #a0a0a0 100%)',
  platinum:  'linear-gradient(135deg, #707070 0%, #d0d0d0 50%, #707070 100%)',
  blue:      'linear-gradient(135deg, #2a5a8c 0%, #80c0f0 50%, #2a5a8c 100%)',
  gold:      'linear-gradient(135deg, #9a7020 0%, #ffd860 50%, #9a7020 100%)',
  red:       'linear-gradient(135deg, #8c2a2a 0%, #f08080 50%, #8c2a2a 100%)',
  green:     'linear-gradient(135deg, #2a6c2a 0%, #80d080 50%, #2a6c2a 100%)',
  brandBg:   'linear-gradient(135deg, #006064 0%, #00bcd4 50%, #ff6f00 100%)',
  brandText: 'linear-gradient(90deg, #00bcd4 0%, #26c6da 25%, #4dd0e1 50%, #26c6da 75%, #00bcd4 100%)',
};
