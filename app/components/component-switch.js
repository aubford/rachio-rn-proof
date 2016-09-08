import { native } from '../util'

import { Button as mButton} from '../components/mobile/Button'
import { Section as mSection} from '../components/mobile/Section'
import { Screen as mScreen} from '../components/mobile/Screen'
import { Logo as mLogo } from '../components/mobile/Logo'
import { Input as mInput } from '../components/mobile/Input'
import { P as mP } from '../components/mobile/P'
import { ZoneList as mZoneList } from '../components/mobile/ZoneList'
import { RunZoneModal as mRunZoneModal } from '../components/mobile/RunZoneModal'
import { Header as mHeader } from '../components/mobile/Header'

import { Button as wButton} from '../components/web/Button'
import { Section as wSection} from '../components/web/Section'
import { Screen as wScreen} from '../components/web/Screen'
import { Logo as wLogo} from '../components/web/Logo'
import { Input as wInput} from '../components/web/Input'
import { P as wP} from '../components/web/P'
import { ZoneList as wZoneList } from '../components/web/ZoneList'
import { RunZoneModal as wRunZoneModal } from '../components/web/RunZoneModal'
import { Header as wHeader } from '../components/web/Header'
var Button
var Section
var Screen
var Logo
var Input
var P
var ZoneList
var RunZoneModal
var Header


if(native){
  Button = mButton
  Section = mSection
  Screen = mScreen
  Logo = mLogo
  Input = mInput
  P = mP
  ZoneList = mZoneList
  RunZoneModal = mRunZoneModal
  Header = mHeader
}else{
  Button = wButton
  Section = wSection
  Screen = wScreen
  Logo = wLogo
  Input = wInput
  P = wP
  ZoneList = wZoneList
  RunZoneModal = wRunZoneModal
  Header = wHeader
}

export {Button}
export {Section}
export {Screen}
export {Logo}
export {Input}
export {P}
export {ZoneList}
export {RunZoneModal}
export {Header}
