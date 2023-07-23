import {View, ActivityIndicator, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Touchable, ScrollView} from 'react-native';
import EditPaymentPageHeader from './EditPaymentPageHeader';
import React, {useState, useEffect } from 'react';
import InputTypeOptions from '../paymentForm/InputTypeOptions';
import AmountTypeOptions from '../paymentForm/AmountTypeOptions';
import AdditionalOptions from '../paymentForm/AdditionalOptions';
import InputAdditionalOptions from '../paymentForm/InputAdditionalOptions';
import { EditComposeIcon, EditIcon, IconButton, MoreVerticalIcon, RupeeIcon, Title, Box, Text, CloseIcon, SaveIcon, CheckIcon, MinusSquareIcon, PlusSquareIcon} from '@razorpay/blade/components';
import Button from '@razorpay/blade-old/src/atoms/Button'
import PaymentFormFooter from './EditPaymentFormFooter';
import BottomSheet from '@razorpay/blade-old/src/molecules/BottomSheet/BottomSheet.native.js';
import BottomSheetHeader from '@razorpay/blade-old/src/molecules/BottomSheet/BottomSheetHeader.native.js';
import BottomSheetFooter from '@razorpay/blade-old/src/molecules/BottomSheet/BottomSheetFooter.native.js';
import BottomSheetContent from '@razorpay/blade-old/src/molecules/BottomSheet/BottomSheetContent.native.js';
import {mock2} from '../mock2';

const PaymentForm = () => {

    const [isLoading, setIsLoading] = useState(true)

    const data=mock2.data;

    const udf_schema=mock2.data.settings.udf_schema;

    const inputData = JSON.parse(udf_schema);

    const inputFieldsArr = inputData.map((item, index) => ({
      id: index,
      name: item.title,
      inputType: item.type,
      desc: item.description,
      addDesc: !!item.description,
      isOptional: !item.required,
    }));


const paymentPageItems = mock2.data.payment_page_items;

const priceFieldsArr = paymentPageItems.map((item, index) => {
  const itemData = item.item;

  return {
    id: index,
    name: itemData.name,
    amountType: item.type,
    amount: itemData.amount,
    isOptional: !item.mandatory,
    imgSelected: !!item.image_url,
    selectedImage: item.image_url,
    addDesc: !!itemData.description,
    desc: itemData.description,
  };
});

    const [AmountTypeBSIsOpen, setAmountTypeBSIsOpen] = useState(false);

    // //Additional Options state variables
    const [AOVisible, setAOVisible] = useState(false);

    //Email
    const [emailField, setEmailField] = useState('Email')
    const [emailModalVisible, setemailModalVisible] = useState(false)
    const [addEmailDesc, setAddEmailDesc] = useState(false)
    const [emailDesc, setEmailDesc] = useState()

    //Phone
    const [phoneField, setPhoneField] = useState('Phone')
    const [phoneModalVisible, setPhoneModalVisible] = useState(false)
    const [addPhoneDesc, setAddPhoneDesc] = useState(false)
    const [phoneDesc, setPhoneDesc ] = useState()

    //Payment Button
    const [buttonLabel, setButtonLabel] = useState(mock2.data.settings.payment_button_label)
    const [buttonModalVisible, setButtonModalVisible] = useState(false)

    //Input Type
    const [ITVisible, setITVisible] = useState(false)
    const [amountName, setAmountName] = useState('Amount')
    const [ITAOVisible, setITAOVisible] = useState(false)

    const [inputFields, setInputFields] = useState(inputFieldsArr)

    const [priceFields, setPriceFields] = useState(priceFieldsArr);

    const [selectedFieldId, setSelectedFieldId] = useState(null)
    const [selectedInputFieldId, setSelectedInputFieldId] = useState(null)

    const handleSnapPressTry = (fieldId) => {
        setSelectedFieldId(fieldId);
        setAmountTypeBSIsOpen(true);
      };

      const handleSnapPressTry2 = (fieldId) => {
        setSelectedInputFieldId(fieldId);
        setITVisible(true);
      };

     const handleNewPriceField = () => {
        const newPriceField = {
            id: priceFields.length+1,
            name: 'Amount',
            amountType: null,
            amount: null,
            isOptional: false,
            imgSelected:false,
            selectedImage: null,
            addDesc: false,
            desc:'',
            }
        setPriceFields((prevPriceFields)=>[...prevPriceFields, newPriceField]);
     }  
     
     const handleNewInputField = () => {
        const newInputField = {
            id: inputFields.length+1,
            name: 'Input',
            inputType: null,
            isOptional: false,
            addDesc: false,
            desc:'',
            }
        setInputFields((prevInputFields)=>[...prevInputFields, newInputField]);
     } 


    const handleEmailModalSave = () => {
        setemailModalVisible(false);
        setAmountTypeBSIsOpen(false);
    }

    const handlePhoneModalSave = () => {
        setPhoneModalVisible(false);
        setAmountTypeBSIsOpen(false);
    }

    const handleButtonModalSave = () => {
        setButtonModalVisible(false);
        setAmountTypeBSIsOpen(false);
    }

  // variables
  const ATsnapPoints = [0.30]
  const AOsnapPoints = [0.45]
  const ITsnapPoints = [0.50, 0.70]


  const [selectImage, setSelectImage] = useState();
    
  const updatePriceField = (fieldId, updatedValues) => {
    // Update the price field with the provided fieldId using the updatedValues
    setPriceFields((prevPriceFields) => {
      return prevPriceFields.map((field) => {
        if (field.id === fieldId) {
          return { ...field, ...updatedValues };
        }
        return field;
      });
    });
  };

  const updateInputField = (fieldId, updatedValues) => {
    // Update the price field with the provided fieldId using the updatedValues
    setInputFields((prevInputFields) => {
      return prevInputFields.map((field) => {
        if (field.id === fieldId) {
          return { ...field, ...updatedValues };
        }
        return field;
      });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(data);
          }, 1000);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

    return (
        <>
        {isLoading? <ActivityIndicator size="large" color="gray" /> :
     <>  
        <EditPaymentPageHeader />
        <ScrollView>
        <View style={styles.container}>
            <Title margin="spacing.5">Payment Form</Title>
            <View style={styles.body}>

                {priceFields.map((field) => (
                    <View style={styles.form_field}>
                        <Box flexDirection="row">
                            <Text>{field.name}</Text>
                            {field.isOptional && <Text> (Optional)</Text>}
                        </Box>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            {field.imgSelected && (
                            <Image source={{uri: field.selectedImage}} style={{height:40, width:40}}/>
                            )}
                            <View>
                                {field.amountType? (
                                    //fix later--add edit button
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <TouchableOpacity style={field.imgSelected? styles.input3 :styles.input2} onPress={()=>handleSnapPressTry(field.id)}>
                                    {field.amountType=='Customer Decides Amount' && <Text type="muted">To be filled by customer</Text>} 
                                        {field.amountType=='Fixed Amount' && <Text weight="bold">₹{field.amount}</Text>}
                                        {field.amountType=='Item With Quantity' && 
                                            <Box flexDirection="row">
                                                <Box width="80%"><Text weight="bold">₹{field.amount}</Text></Box>
                                                <IconButton size="large" icon={MinusSquareIcon}/>
                                                <Text marginX="spacing.2">0</Text>
                                                <IconButton size="large" icon={PlusSquareIcon}/>
                                            </Box>
                                        }
                                    </TouchableOpacity>
                                    <Button icon={EditComposeIcon} variant="tertiary" size="large" onClick={()=>handleSnapPressTry(field.id)}/> 
                                </View>
                                ) : (
                                <View style={styles.pricefield}>
                                    <Button variant="tertiary" icon={RupeeIcon} onClick={()=>handleSnapPressTry(field.id)}>
                                        Price field
                                    </Button>
                                </View> )}
                            </View>
                        </View>
                        {field.addDesc && ( 
                            <Text marginTop="spacing.2">{field.desc}</Text> 
                        )}
                    </View>
                ))}

                {inputFields.map((field, index) => (
                <View key={index} style={styles.form_field}>
                    <Box flexDirection="row">
                            <Text>{field.name}</Text>
                            {field.isOptional && <Text> (Optional)</Text>}
                    </Box>
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <View style={styles.input}>
                            <Text type="muted">To be filled by customer</Text>
                        </View>
                        {/* need to set edit modal visible instead? */}
                        <Button icon={EditComposeIcon} variant="tertiary" size="large" onClick={()=>handleSnapPressTry2(field.id)}/>
                    </View>
                    {field.addDesc && (
                        <Text marginTop="spacing.2">{field.desc}</Text> 
                    )}
                </View>
                ))}

                <View style={styles.form_field}>
                    <Text>Add New</Text>
                    <View style={{flexDirection:'row', width:'95%'}}>
                        <View style={styles.pricefield}>
                            <Button icon={EditIcon} variant="tertiary" onClick={()=>handleNewInputField()}>Input field</Button>
                        </View>
                        <View style={styles.pricefield}>
                            <Button icon={RupeeIcon} variant="tertiary" onClick={()=>handleNewPriceField()}>Price field</Button>
                        </View>
                    </View>
                </View>

        
                <View style={{...styles.form_field,flexDirection: 'row'}}>
                    <Box flex='1'>
                        <Button>{buttonLabel}</Button>
                    </Box>
                    <Button icon={EditComposeIcon} variant="tertiary" size="large" onClick={()=>setButtonModalVisible(true)}/>
                </View>

            </View>
        </View>

        {/* Payment Button Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={buttonModalVisible}
            onRequestClose={() => setButtonModalVisible(!buttonModalVisible)}
        >
            <View style={styles.modalView}>
            <TextInput style={{borderBottomWidth:0.5, width:200}} onChangeText={text => setButtonLabel(text)} value={buttonLabel}/>
                <Box flexDirection="row" marginTop="spacing.7">
                    <Box marginX="spacing.2" width="80px">
                        <Button size="small" icon={CloseIcon} variant="secondary" onClick={() => setButtonModalVisible(false)}>Cancel</Button>
                    </Box>
                    <Box marginX="spacing.2" width="80px">
                        <Button size="small" icon={CheckIcon} variant="primary" onClick={handleButtonModalSave}>Save</Button>
                    </Box>
                </Box>
            
            </View>
        </Modal>

        </ScrollView>
        <PaymentFormFooter />
        
        {/* Amount Type Bottomsheet */}
        <BottomSheet
        visible={AmountTypeBSIsOpen}
        snapPoints={ATsnapPoints}
        onClose={()=>setAmountTypeBSIsOpen(false)}
        >
        <BottomSheetContent>
            <AmountTypeOptions 
            setAmountTypeBSIsOpen={setAmountTypeBSIsOpen}
            setAOVisible={setAOVisible}
            fieldId={selectedFieldId}
            priceFields={priceFields}
            setPriceFields={setPriceFields}
            />
            
            
        </BottomSheetContent>
      </BottomSheet>
    
    {/* Additional options Bottomsheet */}
      <BottomSheet
        visible={AOVisible}
        snapPoints={AOsnapPoints}
        style={{zIndex:999}}
        onClose={()=>setAOVisible(false)}
        // overlayComponent={customBottomSheetBackdrop}
        >
            <BottomSheetContent>
            <BottomSheetHeader title="Additional Options" />
                <AdditionalOptions
                setAOVisible={setAOVisible}
                priceFields={priceFields}
                updatePriceField={updatePriceField}
                setPriceFields={setPriceFields} 
                fieldId={selectedFieldId}
                imgSelected={priceFields.find((field)=>field.id===selectedFieldId)?.imgSelected}
                selectImage={priceFields.find((field)=>field.id===selectedFieldId)?.selectedImage}
                addDesc={priceFields.find((field)=>field.id===selectedFieldId)?.addDesc}
                desc={priceFields.find((field)=>field.id===selectedFieldId)?.desc}
                isOptional={priceFields.find((field)=>field.id===selectedFieldId)?.isOptional}
                />
                
            </BottomSheetContent>
        </BottomSheet>

        {/* Input Field Additional Options BottomSheet */}
      <BottomSheet
        visible={ITAOVisible}
        snapPoints={AOsnapPoints}
        onClose={()=>setITAOVisible(false)}
        >
            <BottomSheetContent>
            <BottomSheetHeader title="Additional Options" />
                <InputAdditionalOptions
                    setITAOVisible={setITAOVisible}
                    inputFields={inputFields}
                    updateInputField={updateInputField}
                    setInputFields={setInputFields} 
                    fieldId={selectedInputFieldId}
                    addDesc={inputFields.find((field)=>field.id===selectedInputFieldId)?.addDesc}
                    desc={inputFields.find((field)=>field.id===selectedInputFieldId)?.desc}
                    isOptional={inputFields.find((field)=>field.id===selectedInputFieldId)?.isOptional}
                />
                
            </BottomSheetContent>
        </BottomSheet>

        {/* Add new input field -- Select Input Type Bottomsheet */}
        <BottomSheet
        visible={ITVisible}
        snapPoints={ITsnapPoints}
        onClose={()=>setITVisible(false)}
        >
            <BottomSheetContent>
                <InputTypeOptions 
                setITVisible={setITVisible}
                inputFields={inputFields} 
                setInputFields={setInputFields} 
                setITAOVisible={setITAOVisible}
                fieldId={selectedInputFieldId}
                name={inputFields.find((field)=>field.id===selectedInputFieldId)?.name}
                inputType={inputFields.find((field)=>field.id===selectedInputFieldId)?.inputType}
                desc={inputFields.find((field)=>field.id===selectedInputFieldId)?.desc}
                addDesc={inputFields.find((field)=>field.id===selectedInputFieldId)?.addDesc}
                isOptional={inputFields.find((field)=>field.id===selectedInputFieldId)?.isOptional}
                />
            </BottomSheetContent>
        </BottomSheet>

    </> }
   </> )
}
export default PaymentForm;

const styles=StyleSheet.create({
    container:{
        // padding: 30

    },
    body:{

    },
    pricefield:{
        borderStyle: 'dashed',
        borderRadius: 1,
        borderColor: '#528FF0',
        flexDirection:'row',
        marginRight: 20,
        marginTop:5,
        borderWidth: 1,
        alignItems: 'center',
        flex:1
    },
    input:{
        justifyContent:'center',
        padding:10,
        marginTop:5,
        flex:1,
        borderWidth:1,
        borderColor: '#a6a6a6'
    },
    input2:{
        justifyContent:'center',
        padding:10,
        marginTop:5,
        width:296,
        borderWidth:1,
        borderColor: '#a6a6a6'
    },
    input3:{
        justifyContent:'center',
        padding:10,
        width:263,
        borderWidth:1,
        borderColor: '#a6a6a6'
    },
    form_field:{
        margin:20
    },
    icon:{
        height:30,
        width:30,
        margin: 5,
        marginHorizontal:8
    },
    container:{
        flexDirection: 'column',
        marginBottom:0,
        padding:10
    },
    options:{
        // flex: 1,
        justifyContent: 'center',
        height: '27%',
        borderWidth:0.5
    },
    modalView: {
        marginTop:'40%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    amount_input:{
        borderWidth:1,width:'60%',height:40, margin:10
    },
    AOModal:{
            marginTop:'50%',
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 3,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            borderWidth:1
    },
    ao_container:{
        flexDirection: 'column',
        marginBottom:0,
        padding:10
    },
    aoptions:{
        justifyContent: 'center',
        height: '18%',
        borderWidth:0.5
    },
    enter_desc:{
        justifyContent:'center',
        padding:10,
        marginTop:5,
        width:296,
        borderWidth:1,
        borderColor: 'lightgray'
    },
    enter_qty:{
        borderWidth:0.5,
        margin:10
    },
    email_field:{
        flex:1,
        borderBottomWidth: 0.5
    },
    edit_payment_button:{
        backgroundColor: '#528FF0',
        width:'80%',
        marginBottom:10,
        borderRadius:3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        color:'white',
    },
    

})
