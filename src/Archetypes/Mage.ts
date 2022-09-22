import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Mage extends Archetype {
  private static _mageCount = 0;
  private _energyType: EnergyType;

  constructor(name: string) {
    super(name);
    this._energyType = 'mana';
    Mage._mageCount += 1;
  }

  public static createdArchetypeInstances = (): 
  number => Mage._mageCount;

  get energyType(): EnergyType {
    return this._energyType;
  }
}