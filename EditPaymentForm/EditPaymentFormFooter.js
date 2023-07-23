import React from 'react';
import Button from '@razorpay/blade-old/src/atoms/Button'
import {View, StyleSheet} from 'react-native';
import { ChevronLeftIcon, Box } from '@razorpay/blade/components';

const PaymentFormFooter = () => {
    
    return (
        <View style={styles.footer_container}>
            <Box marginRight="spacing.5">
                <Button size="large" variant="secondary" icon={ChevronLeftIcon}>Previous</Button>
            </Box>
            <Button size="large">Update Page</Button>
        </View>
    )
}

export default PaymentFormFooter;

const styles=StyleSheet.create({
    footer_container:{
        height:90,
        shadowColor: '#000',
        // shadowOffsetTop: {
        //   width: 0,
        //   height: 4,
        // },
        shadowOpacityTop: 0.1,
        elevation: 5,
        paddingTop:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderWidth:0.01
    }
})