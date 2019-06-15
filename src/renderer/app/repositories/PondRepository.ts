import { Id } from "../storage/Id";
import { IPond, IPondBase } from "./entities";
import { IDbContext, QueryService } from "../storage";
import { injectable } from "inversify";

@injectable()
export class PondRepository {
  constructor(private queryService: QueryService) {}

  public async get(context: IDbContext, id: Id): Promise<IPond> {
    return await this.queryService.queryFirst(
      context,
      `SELECT * FROM Pond WHERE Id = $id`,
      {
        $id: id
      }
    );
  }

  public async insert(context: IDbContext, pond: IPondBase): Promise<IPond> {
    const id = await this.queryService.insert(
      context,
      `
      INSERT INTO Pond (
        Name,
        Length,
        Width,
        Depth,
        Liters
      )
      VALUES (
        $name,
        $length,
        $width,
        $depth,
        $liters
      )
    `,
      {
        $name: pond.Name,
        $length: pond.Length,
        $width: pond.Width,
        $depth: pond.Depth,
        $liters: pond.Liters
      }
    );

    return await this.get(context, id);
  }

  public async update(context: IDbContext, pond: IPond): Promise<void> {
    await this.queryService.update(
      context,
      `
      UPDATE Pond
      SET
        Name = $name,
        Length = $length,
        Width = $width,
        Depth = $depth,
        Liters = $liters
      WHERE
        Id = $id
    `,
      {
        $id: pond.Id,
        $name: pond.Name,
        $length: pond.Length,
        $width: pond.Width,
        $depth: pond.Depth,
        $liters: pond.Liters
      }
    );
  }

  public async delete(context: IDbContext, pond: IPond): Promise<void> {
    await this.queryService.update(
      context,
      `
      DELETE FROM Pond
      WHERE Id = $id
    `,
      {
        $id: pond.Id
      }
    );
  }
}
