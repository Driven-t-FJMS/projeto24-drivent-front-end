import { BoxOption, ButtonConfirmation, RowChoice, SectionRoomChoice, SingleChoice, SubtitleSection } from "./styles";
import { IoIosPerson } from 'react-icons/io';

export default function RoomChoice (){
    return (
        <SectionRoomChoice>
            <SubtitleSection>Ótima pedida! Agora escolha seu quarto</SubtitleSection>
            <RowChoice>
                <SingleChoice>
                    <BoxOption>100</BoxOption>
                    <BoxOption><IoIosPerson /><IoIosPerson  /><IoIosPerson /></BoxOption>
                </SingleChoice>
                <SingleChoice>
                    <BoxOption>100</BoxOption>
                    <BoxOption><IoIosPerson /><IoIosPerson  /><IoIosPerson /></BoxOption>
                </SingleChoice>
                <SingleChoice>
                    <BoxOption>100</BoxOption>
                    <BoxOption><IoIosPerson /><IoIosPerson  /><IoIosPerson /></BoxOption>
                </SingleChoice>
                <SingleChoice>
                    <BoxOption>100</BoxOption>
                    <BoxOption><IoIosPerson /><IoIosPerson  /><IoIosPerson /></BoxOption>
                </SingleChoice>
                <SingleChoice>
                    <BoxOption>100</BoxOption>
                    <BoxOption><IoIosPerson /><IoIosPerson  /><IoIosPerson /></BoxOption>
                </SingleChoice>
                <SingleChoice>
                    <BoxOption>100</BoxOption>
                    <BoxOption><IoIosPerson /><IoIosPerson  /><IoIosPerson /></BoxOption>
                </SingleChoice>
                <SingleChoice>
                    <BoxOption>100</BoxOption>
                    <BoxOption><IoIosPerson /><IoIosPerson  /><IoIosPerson /></BoxOption>
                </SingleChoice>
                <SingleChoice>
                    <BoxOption>100</BoxOption>
                    <BoxOption><IoIosPerson /><IoIosPerson  /><IoIosPerson /></BoxOption>
                </SingleChoice>
            </RowChoice>
            <ButtonConfirmation>RESERVAR QUARTO</ButtonConfirmation>
        </SectionRoomChoice>
    );
}