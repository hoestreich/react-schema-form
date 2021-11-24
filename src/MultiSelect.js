// @flow
import React, { Component } from 'react'
import MenuItem from '@mui/material/MenuItem'
import MuiSelect from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Chip from '@mui/material/Chip'
import ComposedComponent from './ComposedComponent'
import utils from './utils'
import type { Localization } from './types'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

type Props = {
  model: any,
  form: any,
  onChangeValidate: any,
  classes: any,
  localization: Localization
}

type State = {
  currentValue: any
}

class MultiSelect extends Component<Props, State> {
  constructor(props) {
    super(props)
    const { model, form } = this.props
    this.state = {
      currentValue: utils.getValueFromModel(model, form.key) || []
    }
  }

  static getDerivedStateFromProps(props: Props) {
    const { model, form } = props
    if (model && form.key) {
      return {
        currentValue: utils.getValueFromModel(model, form.key) || []
      }
    }
    return null
  }

  onSelected = (event) => {
    const { onChangeValidate } = this.props
    const currentValue = event.target.value
    this.setState({ currentValue })
    onChangeValidate(currentValue)
  }

  render() {
    const {
      form,
      localization: { getLocalizedString }
    } = this.props
    const { currentValue } = this.state
    const getTitle = utils.getTitleByValue.bind(this, form.titleMap)
    const menuItems = form.titleMap.map((item) => (
      <MenuItem
        key={item.value}
        value={item.value}
        sx={
          currentValue.indexOf(item.value) === -1
            ? { fontWeight: 'typography.fontWeightRegular' }
            : { fontWeight: 'typography.fontWeightMedium' }
        }
      >
        {item.name && getLocalizedString(item.name)}
      </MenuItem>
    ))
    return (
      <FormControl fullWidth {...form.otherProps}>
        <InputLabel required={form.required}>
          {form.title && getLocalizedString(form.title)}
        </InputLabel>
        <MuiSelect
          multiple
          value={currentValue || ''}
          placeholder={form.placeholder && getLocalizedString(form.placeholder)}
          disabled={form.readonly}
          onChange={this.onSelected}
          MenuProps={MenuProps}
          renderValue={(selected) => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={getTitle(value) && getLocalizedString(getTitle(value))}
                  sx={{ margin: 0.25 }}
                />
              ))}
            </div>
          )}
        >
          {menuItems}
        </MuiSelect>
      </FormControl>
    )
  }
}

export default ComposedComponent(MultiSelect)
