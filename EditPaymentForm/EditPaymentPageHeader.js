import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Box, CloseIcon, FileTextIcon, IconButton, SettingsIcon, Text, Title} from '@razorpay/blade/components'
import Button from '@razorpay/blade-old/src/atoms/Button'


const EditPaymentPageHeader = () => {

    return (
        <View style={styles.header}>
            <Box flex="1" flexDirection="row" alignItems="center">
            <Title>Edit Payment Page</Title>
                {/* <TouchableOpacity style={{marginHorizontal:10}}>
                    <Image source={require('../icons/icons8-close-24.png')} />
                </TouchableOpacity> */}
                <Box marginHorizontal="spacing.4">
                    <Button icon={CloseIcon} variant="tertiary" size="large" />
                </Box>
            </Box>

            <Box flexDirection="row">
            {/* <TouchableOpacity style={{borderWidth:1, marginHorizontal:10}}>
                <Image source={require('../icons/icons8-settings-32.png')} style={styles.icon} />
            </TouchableOpacity> */}
            <Box marginX="spacing.3">
                <Button icon={SettingsIcon} variant="secondary" size="large" />
            </Box>
            <Button icon={FileTextIcon} variant="secondary" size="large" />
            </Box>
        </View>
    )
}

export default EditPaymentPageHeader;

const styles=StyleSheet.create({
    header:{
        flexDirection: 'row',
        // backgroundColor:"#2F3345",
        backgroundColor: 'lightblue',
        height: 70,
        padding: 20,
        alignItems:'center'
    },
    icon:{
        height:30, 
        width:30,
        margin:5,
    }
})

