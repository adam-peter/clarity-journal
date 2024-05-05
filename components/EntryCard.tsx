import React from 'react'
import { JournalEntry } from '@prisma/client'

const EntryCard = ({entry}: {entry: JournalEntry}) => {
  return (
    <div>
      {entry.id}
    </div>
  )
}

export default EntryCard
