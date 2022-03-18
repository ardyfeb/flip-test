import { default as React, useEffect } from 'react'
import { default as Animated, interpolateColor, useAnimatedStyle, useSharedValue, withTiming, ZoomIn, ZoomInEasyDown, ZoomInEasyUp, ZoomOutEasyDown, ZoomOutEasyUp } from 'react-native-reanimated'
import { useSnapshot } from 'valtio'
import { Portal } from '@gorhom/portal'

import { transactionFilter, TransactionFilterOrderBy } from '@/state/transaction'
import { TRANSACTION_ORDER_OPTIONS } from '@/data/entity/transaction'

import { Box } from '../common/box'
import { Text } from '../common/text'
import { Pressable } from '../common/pressable'
import { Radio } from '../common/radio'


export const TransactionFilterDialog: React.FunctionComponent = props => {
  const transactionFilterSnap = useSnapshot(transactionFilter)
  const animationState = useSharedValue(0)

  useEffect(
    (): void => {
      animationState.value = withTiming(transactionFilterSnap.dialogVisible ? 1 : 0, { duration: 100 })
    },
    [transactionFilterSnap.dialogVisible]
  )

  const dialogBackdrop = useAnimatedStyle(
    () => {
      const color = interpolateColor(
        animationState.value, [0, 1], ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)'], 'RGB'
      )
      
      return {
        flex: 1,
        backgroundColor: color
      }
    }
  )

  const onBackdropPress = (): void => {
    transactionFilter.dialogVisible = false
  }

  const onOrderOptionPress = (key: string): void => {
    if (key == 'default') {
      transactionFilter.orderBy = null
    } else {
      transactionFilter.orderBy = key as TransactionFilterOrderBy
    }

    transactionFilter.dialogVisible = false
  }

  return (
    <Portal>
      <Pressable 
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        top={0}
        onPress={onBackdropPress}
        pointerEvents={transactionFilterSnap.dialogVisible ? 'auto': 'none'}
      > 
        { /* @ts-ignore */ }
        <Animated.View style={dialogBackdrop} pointerEvents="box-none">
          <Box flex={1} alignItems="stretch" justifyContent="center" px={6}>
            {
              transactionFilterSnap.dialogVisible && (
                <Animated.View entering={ZoomInEasyUp.duration(200)} exiting={ZoomOutEasyUp.duration(200)}>
                  <Box bgColor="white" borderRadius="base" p={6}>
                    {
                      TRANSACTION_ORDER_OPTIONS.map(
                        filter => (
                          <Pressable 
                            flexDirection="row" 
                            alignItems="center"
                            py={4}
                            key={filter.key || 'default'}
                            onPress={() => onOrderOptionPress(filter.key!!)}
                          >
                            <Radio selected={filter.key == transactionFilterSnap.orderBy} />
                            <Text color="textRegular" font="regular" ml={2}>
                              {filter.title}
                            </Text>
                          </Pressable>
                        )
                      )
                    }
                  </Box>
                </Animated.View>
              )
            }
          </Box>
        </Animated.View>
      </Pressable>
    </Portal>
  )
}