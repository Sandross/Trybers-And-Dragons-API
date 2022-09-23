import Archetype from './Archetypes/Archetype';
import { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _dexterity: number;
  private _energy: Energy;
  private _name: string;
  private _defense: number;

  static randomInt = (): number => Math.floor(Math.random() * 10) + 1;

  constructor(name: string) {
    this._name = name;
    this._dexterity = Character.randomInt();
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._defense = Character.randomInt();
    this._strength = Character.randomInt();
    this._energy = {
      type_: this._archetype.energyType,
      amount: Character.randomInt(),
    };
  }

  get race(): Race {
    return this._race;
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy {
    return { ...this._energy };
  }

  public receiveDamage = (attackPoints: number): number => {
    const damage = attackPoints - this._defense;
    const lifePoints = this.lifePoints - damage;
    if (damage > 0) {
      this._lifePoints -= damage;
    } 
    console.log(damage, lifePoints);
    console.log(damage);
    if (lifePoints <= 0) {
      this._lifePoints = -1;
    } 
    return this.lifePoints;
  };

  public attack = (enemy: SimpleFighter): void => {
    enemy.receiveDamage(this._strength);
  };

  levelUp = (): void => {
    this._maxLifePoints += Character.randomInt();
    if (this._maxLifePoints > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    }
    this._strength += Character.randomInt();
    this._defense += Character.randomInt();
    this._dexterity += Character.randomInt();
    this._lifePoints = this._maxLifePoints;
    this._energy.amount = 10;
  };

  special(enemy: Fighter): void {
    enemy.receiveDamage(this._strength * 2);
  }
}