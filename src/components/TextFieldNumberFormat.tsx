'use client';

import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

export const TextFieldNumberFormat = React.forwardRef<NumericFormatProps>(function NumericFormatCustom(props, ref) {
  const { onChange, decimalScale = 0, ...other } = props as NumericFormatProps;
  return (
    <NumericFormat
      {...other}
      value={other.value || '0'}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange &&
          onChange({
            target: {
              value: values.floatValue?.toString() || '0',
            },
          } as React.ChangeEvent<HTMLInputElement>);
      }}
      thousandSeparator
      valueIsNumericString
      decimalScale={decimalScale}
      fixedDecimalScale
      placeholder="0"
      style={{ textAlign: 'right' }}
      isAllowed={(value) => {
        if (other.min != undefined && other.max != undefined) {
          let { floatValue } = value;
          floatValue = floatValue || 0;
          return floatValue >= +other.min && floatValue <= +other.max;
        }
        return true;
      }}
    />
  );
});
