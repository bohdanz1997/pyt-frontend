import React from 'react'
import * as P from 'prop-types'

export const ConditionalList = ({
  list,
  renderExists,
  renderEmpty = () => null,
}) => (
  <>
    {list && list.filter(Boolean).length > 0
      ? renderExists(list)
      : renderEmpty()}
  </>
)

ConditionalList.propTypes = {
  list: P.array.isRequired,
  renderExists: P.func.isRequired,
  renderEmpty: P.func,
}
