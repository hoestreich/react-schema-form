// @flow
/**
 * Created by steve on 11/09/15.
 */
import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import type { Localization } from './types'

type Props = {
  form: any,
  mapper: any,
  builder: any,
  model: any,
  onChange: any,
  classes: any,
  localization: Localization
}

const FieldSet = ({
  form,
  mapper,
  builder,
  model,
  onChange,
  localization: { getLocalizedString }
}: Props) => {
  const forms = form.items.map((f, index) =>
    builder(f, model, index, mapper, onChange, builder)
  )

  return (
    <FormControl
      component='fieldset'
      sx={{ marginTop: 1 }}
      style={form.style}
      {...form.otherProps}
    >
      <FormLabel component='legend' required={form.required}>
        {form.title && getLocalizedString(form.title)}
      </FormLabel>
      <div style={{ marginLeft: 1 }}>{forms}</div>
    </FormControl>
  )
}

export default FieldSet
