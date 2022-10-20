import { of, delay, Observable, expand, reduce, takeWhile, tap } from 'rxjs';
                                                    
const items$ = fetch().pipe(
  expand(response => fetch(response.cursor)),
  takeWhile(response => !!response.cursor, true),
  reduce((all, {data}) => all.concat(data), [])
);

items$.subscribe(
  val => console.log('items$', val)
);

interface Response {
  data: number[];
  cursor: number;
}

function fetch(cursor = 0): Observable<Response> {
  const PER_PAGE = 3;
  const n = cursor * PER_PAGE + 1;
  const response = {
    data: [n, n+1, n+2],
    cursor: cursor < 3 ? cursor+1 : undefined
  };

  return of(response).pipe(delay(1250), tap(r => console.log(`> fetch(${cursor})`, r)));
}