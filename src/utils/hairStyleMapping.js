const HAIRSTYLE_MAPPING = {
  m01: 'two block hairstyle',
  m02: 'dandy cut hairstyle',
  m03: 'pomade hairstyle',
  m04: 'side part perm hairstyle',
  m05: 'regent cut hairstyle',
  m06: 'crop cut hairstyle',
  m07: 'buzz cut hairstyle',
  m08: 'shadow perm hairstyle',
  m09: 'ash perm hairstyle',
  m10: 'quiff hairstyle',
  f01: 'hush cut hairstyle',
  f02: 'layered cut hairstyle',
  f03: 'bob cut with curls hairstyle',
  f04: 'bob cut hairstyle',
  f05: 'hippie perm hairstyle',
  f06: 'hidden perm hairstyle',
  f07: 'shag cut hairstyle',
  f08: 'build perm hairstyle',
  f09: 'cushion perm hairstyle',
  f10: 'volume perm hairstyle',
};

const KOREAN_TO_STYLE_ID = {
  투블럭: 'm01',
  댄디컷: 'm02',
  포마드: 'm03',
  가르마펌: 'm04',
  리젠트컷: 'm05',
  크롭컷: 'm06',
  가일컷: 'm07',
  쉐도우펌: 'm08',
  애즈펌: 'm09',
  리프컷: 'm10',
  허쉬컷: 'f01',
  단발레이어드: 'f02',
  단발C컬: 'f03',
  보브컷: 'f04',
  히피펌: 'f05',
  장발S컬: 'f06',
  젤리펌: 'f07',
  빌드펌: 'f08',
  태슬컷: 'f09',
  히메컷: 'f10',
};

export const convertKoreanToStyleId = (hairStyle) => {
  const trimmed = hairStyle.trim();
  const styleId = KOREAN_TO_STYLE_ID[trimmed];

  if (!styleId) {
    throw new Error(`알 수 없는 헤어스타일: ${hairStyle}`);
  }

  return styleId;
};
