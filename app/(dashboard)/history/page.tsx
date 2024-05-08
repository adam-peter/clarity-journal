import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import React from 'react'

const History = () => {
  return (
    <div>
      history
    </div>
  )
}

const getData = async () => {
  const user = await getUserByClerkId();
  const analysies = await prisma.analysis.findMany({
    where: {
      
    }
  })
}

export default History
