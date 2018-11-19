import { Document, Model, Types } from 'mongoose';
import { Typegoose, ModelType, InstanceType } from 'typegoose';
import 'automapper-ts/dist/automapper';

export abstract class BaseService<T extends Typegoose> {
  protected _mapper: AutoMapperJs.AutoMapper;

  protected _model: ModelType<T>;

  private get modelName() {
    return this._model.modelName;
  }

  private get viewModelName() {
    return `${this._model.modelName}Vm`;
  }

  async map<K>(
    object: Partial<InstanceType<T>> | Partial<InstanceType<T>>[],
    isArray: boolean = false,
    sourceKey: string = this.modelName,
    destinationKey: string = this.viewModelName,
  ): Promise<K> {
    return this._mapper.map(sourceKey, destinationKey, object);
  }

  async findAll(
    filter = {},
    populate: string[] = [],
    page: number = 0,
    perPage: number = 10,
  ): Promise<InstanceType<T>[]> {
    let query = this._model.find(filter).sort('-createdAt');

    populate.forEach(item => {
      query = query.populate(item);
    });

    return await query
      .skip(page * perPage)
      .limit(perPage)
      .exec();
  }

  async findOne(filter = {}): Promise<InstanceType<T>> {
    return this._model.findOne(filter).exec();
  }

  async findById(
    id: string,
    populate: string[] = [],
  ): Promise<InstanceType<T>> {
    let query = this._model.findById(this.toObjectId(id));

    populate.forEach(element => {
      query = query.populate(element);
    });

    return query.exec();
  }

  async create(item: InstanceType<T>): Promise<InstanceType<T>> {
    return this._model.create(item);
  }

  async delete(id: string): Promise<InstanceType<T>> {
    return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
  }

  async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
    return this._model
      .findByIdAndUpdate(this.toObjectId(id), item, { new: true })
      .exec();
  }

  async clearCollection(filter = {}): Promise<void> {
    return this._model.deleteMany(filter).exec();
  }

  private toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }
}
